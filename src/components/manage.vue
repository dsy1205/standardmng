<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>项目标准管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '20px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          
          	<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
			  <!-- 一级菜单 -->
		  	<el-submenu index="2"><template slot="title"><i class="el-icon-document"></i>准入指标</template>
			  <!-- 二级菜单 -->
				<el-menu-item index="foodList">代码质量</el-menu-item>
				<el-menu-item index="orderList">自动化通过率</el-menu-item>
				<el-menu-item index="adminList">阈值设置</el-menu-item>
			</el-submenu>
			<el-submenu index="3"><template slot="title"><i class="el-icon-plus"></i>准出指标</template>
				<el-menu-item index="addShop">case覆盖率</el-menu-item>
				<el-menu-item index="addGoods">bug修复</el-menu-item>
                <el-menu-item index="addGoods">阈值设置</el-menu-item>
			</el-submenu>
			<el-submenu index="4"><template slot="title"><i class="el-icon-message"></i>邮件周知</template>
				<el-menu-item index="visitor">delay邮件</el-menu-item>
                <el-menu-item index="newMember">reject邮件</el-menu-item>
				<el-menu-item index="newMember">进度邮件</el-menu-item>
                <el-menu-item index="newMember">发布邮件</el-menu-item>
			</el-submenu>
			<el-submenu index="5"><template slot="title"><i class="el-icon-setting"></i>权限管理</template>
				<el-menu-item index="adminSet">角色列表</el-menu-item>
				<el-menu-item index="sendMessage">权限列表</el-menu-item>
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
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
  margin-right: 10px;
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
</style>
