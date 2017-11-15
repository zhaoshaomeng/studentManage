<template>
	<div>
		 <div class="login">
		  	<h1>Admin</h1>
			<el-form label-width="100px" :model="login">
			  <el-form-item label="用户">
			    <el-input v-model="login.name" placeholder="username" style="width:90%; float:left;"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input v-model="login.password" placeholder="password" style="width:90%; float:left;"></el-input>
			  </el-form-item>
			  <el-button @click="handleLogin">登录</el-button>
			  <el-button @click="dialogFormVisible = true">注册</el-button>
			</el-form>
 		 </div>
 		 <div>
			<el-dialog title="Register" :visible.sync="dialogFormVisible" style="font-family:'Papyrus';">
			  <el-form :model="registerForm">
			    <el-form-item label="用户" :label-width="formLabelWidth">
			      <el-input v-model="registerForm.name" auto-complete="off" placeholder="username"></el-input>
			    </el-form-item>
			    <el-form-item label="姓名" :label-width="formLabelWidth">
			      <el-input v-model="registerForm.password" auto-complete="off" placeholder="password"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer" style="margin-top:-20px">
			    <el-button @click="registerFormCancle">取 消</el-button>
	      		<el-button type="primary" @click="registerFormEnsure">注 册 并 登 陆</el-button>
  		   	  </div>
			</el-dialog>
	  	</div>
	</div>
</template>
<script type="text/javascript">
	export default {
	  data () {
	    return {
	      login: {
	        name: '',
	        password: ''
	      },
	      // data: [
	      //   {name: 'm', password: '1'},
	      //   {name: 'm', password: '2'},
	      //   {name: 'm', password: '3'}
	      // ],
	      dialogFormVisible: false,
	      formLabelWidth: '50px',
	      registerForm: {
	        name: '',
	        password: ''
	      }
	    }
	  },
	  created () {
	    console.log(localStorage)
	    // localStorage.clear()
	    // for (var i = 0; i < localStorage.length; i++) {
	    //   console.log('name=' + localStorage.key(i) + '  ' + 'password=' + localStorage.getItem(localStorage.key(i)))
	    // }
	  },
	  methods: {
	    handleLogin () { // 登陆
	      // for (var i = 0; i < this.data.length; i++) {
	      //   if (this.login.name === this.data[i].name && this.login.password === this.data[i].password) {
	      //     window.location.href = '#/manage'
	      //     this.$message({
	      //       message: '登录成功!',
	      //       type: 'success'
	      //     })
	      //     return
	      //   } else {
	      //     this.$message({
	      //       message: '用户名或密码错误!',
	      //       type: 'error'
	      //     })
	      //   }
	      // }
	      if (this.login.name === '' || this.login.password === '') {
	        this.$message({
	          message: '请输入完整信息!',
	          type: 'warning'
	        })
	      } else if (localStorage.length === 0) {
	        this.$message({
	          message: '用户名或密码错误!',
	          type: 'error'
	        })
	      }
	      for (var i = 0; i < localStorage.length; i++) {
	        if (this.login.name === localStorage.key(i) && this.login.password === localStorage.getItem(localStorage.key(i))) {
	          // this.$root.admin.name = localStorage.key(i)
	          // this.$root.admin.password = localStorage.getItem(localStorage.key(i))
	          sessionStorage.setItem('admin', localStorage.key(i))
	          window.location.href = '#/manage'
	          this.$message({
	            message: '登录成功!',
	            type: 'success'
	          })
	          return
	        } else {
	          this.$message({
	            message: '用户名或密码错误!',
	            type: 'error'
	          })
	        }
	      }
	    },
	    registerFormCancle () { // 取消注册
	      this.dialogFormVisible = false
	      this.$message({
	        message: '已取消注册!',
	        type: 'info'
	      })
	    },
	    registerFormEnsure () { // 注册并登陆
	      if (this.registerForm.name === '' || this.registerForm.password === '') {
	        this.$message({
	          message: '请填写完整信息!',
	          type: 'warning'
	        })
	        return
	      }
	      for (var i = 0; i < localStorage.length; i++) {
	        if (this.registerForm.name === localStorage.key(i)) {
	          this.$message({
	            message: '用户名已存在!',
	            type: 'warning'
	          })
	          return
	        }
	      }
	      localStorage.setItem(this.registerForm.name, this.registerForm.password)
	      this.dialogFormVisible = false
	      sessionStorage.setItem('admin', this.registerForm.name)
	      window.location.href = '#/manage'
	      this.$message({
	        message: '登陆成功!',
	        type: 'success'
	      })
	    }
	  }
	}
</script>
<style type="text/css">
	.login{
	height:260px;
	width:50%;
	padding-bottom:10px;
	margin:auto;
	text-align:center;
	box-shadow:2px 2px 15px #333;
	position:absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius:10px;
	}
	h1{
	font-family:"Papyrus";
	color:#333;
	}
</style>