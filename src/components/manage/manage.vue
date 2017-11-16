<template>
	<div>
		<div class="header">
			<div style="width:80%; margin:0 auto;">
				<div class="title">
					<h1>学生信息管理系统/<span>Student information management system</span></h1>
				</div>
				<div class="admin">
					<i class="iconfont">&#xe605;</i>
					{{admin.name}}
					<!-- {{admin.password}} -->
				</div>
			</div>
		</div>
		<div class="main"><!-- 主要内容模块 -->
			<div class="selectMenu"><!-- 左侧选择模块 -->
				<ul>
					<li v-for="(item,index) in tabItems" @click="tab(index)" :class="{'tabActive' : activeIndex === index}" style="overflow:hidden;">{{item.title}}<i :class="{'el-icon-d-arrow-right' : activeIndex === index}" style="float:right; margin-right:20px;"></i></li>
				</ul>
			</div><div class="content"><!-- 右侧显示信息模块 -->
				<student-manage v-show="activeIndex === 0"></student-manage>
				<warden-manage v-show="activeIndex === 1"></warden-manage>
			</div>
		</div>
		<div v-show="activeIndex === -1">
			<h1 style="font-family:'Papyrus'">Welcome {{admin.name}}</h1>
			<i class="iconfont"></i>
		</div>
	</div>
</template>
<script type="text/javascript">
	import StudentManage from '@/components/manage/student/student'
	import WardenManage from '@/components/manage/warden/warden'
	export default{
	  components: {
	    StudentManage,
	    WardenManage
	  },
	  data () {
	    return {
	      tabItems: [
	        {title: 'StudentManage'},
	        {title: 'WardenManage'}
	      ],
	      activeIndex: -1,
	      admin: {
	        name: '',
	        password: ''
	      }
	    }
	  },
	  mounted () {
	    this.admin.name = sessionStorage.getItem('admin')
	  },
	  methods: {
	    tab (index) {
	      this.activeIndex = index
	    }
	  }
	}
</script>
<style type="text/css">
@font-face {
  font-family: 'iconfont';
  src: url('../../assets/fonts/iconfont.eot');
  src: url('../../assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('../../assets/fonts/iconfont.woff') format('woff'),
  url('../../assets/fonts/iconfont.ttf') format('truetype'),
  url('../../assets/fonts/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
	*{
		margin: 0;
		padding: 0;
	}
	.tabActive{
		color: red;
		background: #dfe6ec;
		font-size: 18px;
	}
	.header{
		width: 100%;
		height: 100px;
		background: #278296;
	}
	.header .title{
		float:left;
		height:100px;
		line-height:100px;
	}
	.header .admin{
		float:right;
		height: 100px;
		line-height: 100px;
		color: #fff;
	}
	.header h1{
		color: #fff;
		font-size: 35px;
		font-family: 'STXingkai';
	}
	.header h1 span{
		font-family: 'Papyrus';
		font-size: 20px;
	}
	.header .admin{
		font-family: 'Papyrus';
		font-size: 20px;
	}
	.main{
		width: 80%;
		margin: 0 auto;
		display: inline-block;
	}
	.selectMenu{ /*导航*/
		width: 20%;
		height: 50px;
		display: inline-block;
		vertical-align: top;
	}
	.selectMenu ul{
		list-style: none;
		background: #eef1f6;
	}
	.selectMenu ul li{
		height: 40px;
		width: 100%;
		line-height: 40px;
		border-top: 1px solid #dfe6ec;
		cursor: pointer;
	}
	.selectMenu ul li i{ /*图标*/
		height:40px;
		line-height:40px;
	}
	.selectMenu ul li:first-child{
		border: none;
	}
	.content{
		width: 80%;
		display: inline-block;
	}
</style>