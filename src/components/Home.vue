<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" width="35" height="35" style="margin-left:15px;" alt="image">
        <span>项目标准管理系统</span>
      </div>      
      <el-dropdown trigger="click" @command="handleCommand">
        <div>
          <i class="iconfont icon-user" style="margin-left: 15px;"></i>
          <span style="font-size: 15px;margin-right: 1px;margin-left:10px">{{ userName }}</span>
        </div>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout" command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '45px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened 
        :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          
          	<el-menu-item index="/index"><i class="el-icon-menu" @click="saveNavState('/index')"></i>首页</el-menu-item>
			  <!-- 一级菜单 -->
		  	<el-submenu index="2"><template slot="title"><i class="el-icon-document"></i>准入指标</template>
			  <!-- 二级菜单 -->
				<el-menu-item index="/codequality" @click="saveNavState('/codequality')">代码质量</el-menu-item>
				<el-menu-item index="/autopass" @click="saveNavState('/autopass')">自动化通过率</el-menu-item>
				<el-menu-item index="/inthreshold" @click="saveNavState('/inthreshold')">阈值设置</el-menu-item>
			</el-submenu>
			<el-submenu index="3"><template slot="title"><i class="el-icon-plus"></i>准出指标</template>
				<el-menu-item index="/casecover" @click="saveNavState('/casecover')">case覆盖率</el-menu-item>
				<el-menu-item index="/bugfix" @click="saveNavState('/bugfix')">bug修复</el-menu-item>
        <el-menu-item index="/outthreshold" @click="saveNavState('/outthreshold')">阈值设置</el-menu-item>
			</el-submenu>
			<el-submenu index="4"><template slot="title"><i class="el-icon-message"></i>邮件周知</template>
				<el-menu-item index="/delaymail" @click="saveNavState('/delaymail')">delay邮件</el-menu-item>
        <el-menu-item index="/rejectMail" @click="saveNavState('/rejectmail')">reject邮件</el-menu-item>
				<el-menu-item index="/scheduleMail" @click="saveNavState('/deploymail')">进度邮件</el-menu-item>
        <el-menu-item index="/deployMail" @click="saveNavState('/schedulemail')">发布邮件</el-menu-item>
			</el-submenu>
			<el-submenu index="5"><template slot="title"><i class="el-icon-setting"></i>权限管理</template>
				<el-menu-item index="/roles" @click="saveNavState('/roles')">角色列表</el-menu-item>
				<el-menu-item index="/rights" @click="saveNavState('/rights')">权限列表</el-menu-item>
			</el-submenu>	          
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
    }
  },
  created() {
    this.getUserInfo()
    this.activePath = window.sessionStorage.getItem('activePath')       
  },
  computed: {
    userName:function(){
      return window.sessionStorage.getItem('userName')
    }
  },
  methods: {
     // 点击重置按钮，
    async getUserInfo() {
      const { data: res } = await this.$http.get('getUserInfo')
      //登入接口返回成功，且返回登入信息token等不为空
      if(res.msg='成功' && res.data!=null){
        
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token);
        window.sessionStorage.setItem('userName',res.data.userName);
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/index')
      }          
    },
    logout() {
      //登出后清除session中的token并跳转到登入页
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    handleCommand(command) {
      if (command == "loginout") {
        this.logout
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 0px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-dropdown{
  color: #fff;
}
</style>
