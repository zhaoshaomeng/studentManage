<template>
	<div>
		<div style="height:40px; line-height:40px;">
			<el-button class="add" style="width:17%;height:90%;margin-right:3%;" @click="handleAdd"><i class="el-icon-plus" style="margin-right:5px"></i>添加
			</el-button><el-input placeholder="信息检索" icon="search" v-model="searchString" :on-icon-click="searchFor" style="width:80%;"></el-input>
			<el-dialog title="添加信息" :visible.sync="addDialogFormVisible" style="text-align:left;">
			  <el-form :model="person" ref="person" :label-width="formLabelWidth" :rules="rules">
			  	  <el-form-item label="学号" prop="id">
				    <el-input type="" v-model.number="person.id" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="姓名" prop="name">
				    <el-input type="" v-model="person.name" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="年龄" prop="age"
				    >
				    <el-input type="" v-model.number="person.age" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="电话" prop="phone">
				    <el-input type="" v-model="person.phone" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="地址" prop="address">
				    <el-input type="" v-model="person.address" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item style="float:right;">
				    <el-button @click="addFormCancle">取消</el-button>
				    <el-button @click="resetAddForm('person')">重置</el-button>
				    <el-button type="primary" @click="addFormEnsure('person')">确定</el-button>
				  </el-form-item>
			  </el-form>
			</el-dialog>
		</div>
	  	<div>
		  <el-table :data="searchPeople" border style="width: 100%">
		    <el-table-column prop="id" label="学号"></el-table-column>
		    <el-table-column prop="name" label="姓名"></el-table-column>
		    <el-table-column prop="age" label="年龄"></el-table-column>
		    <el-table-column prop="phone" label="电话"></el-table-column>
		    <el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column label="操作">
		      <template scope="scope">
		        <el-button size="small" @click="handleEdit(scope.$index, scope.row)" style="margin:2px 0;padding:7px 5px"><i class="el-icon-edit" style="margin-right:5px"></i>编辑</el-button>
		        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" style="margin:2px 0;padding:7px 5px"><i class="el-icon-delete" style="margin-right:5px"></i>删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
	  	</div>
	  	<div style="text-align:left">
			<el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
			  <el-form :model="editForm">
			    <el-form-item label="学号" :label-width="formLabelWidth">
			      <el-input v-model="editForm.id" auto-complete="off" disabled name="number"></el-input>
			    </el-form-item>
			    <el-form-item label="姓名" :label-width="formLabelWidth">
			      <el-input v-model="editForm.name" auto-complete="off" name="username"></el-input>
			    </el-form-item>
			    <el-form-item label="年龄" :label-width="formLabelWidth">
			      <el-input v-model="editForm.age" auto-complete="off" name="age"></el-input>
			    </el-form-item>
			    <el-form-item label="电话" :label-width="formLabelWidth">
			      <el-input v-model="editForm.phone" auto-complete="off" name="phone"></el-input>
			    </el-form-item>
			    <el-form-item label="地址" :label-width="formLabelWidth">
			      <el-input v-model="editForm.address" auto-complete="off" name="address"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="editFormCancle">取 消</el-button>
			    <el-button type="primary" @click="editFormEnsure">确 定</el-button>
			  </div>
			</el-dialog>
	  	</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	export default {
	  data () {
	    var validatePhone = (rule, value, callback) => { // 电话验证
	      if (value === '') {
	        callback(new Error('电话不能为空'))
	      }
	      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
	        callback(new Error('电话格式不正确'))
	      } else {
	        callback()
	      }
	    }
	    var validateAge = (rule, value, callback) => { // 年龄验证
	      if (value === '') {
	        callback(new Error('年龄不能为空'))
	      }
	      if (!/^[1-9]{2}$/.test(value)) {
	        callback(new Error('年龄格式不正确'))
	      } else {
	        callback()
	      }
	    }
	    var validateId = (rule, value, callback) => { // 学号验证
	      if (value === '') {
	        callback(new Error('学号不能为空'))
	      }
	      if (!/^\d{10}$/.test(value)) {
	        callback(new Error('学号必须为10位数字'))
	      } else {
	        callback()
	      }
	    }
	    return {
	      people: [
	        {
	          id: '2014025582',
	          name: 'zsm',
	          age: '15',
	          phone: '13644600829',
	          address: 'ggg'
	        },
	        {
	          id: '201402666',
	          name: 'ddd',
	          age: '16',
	          phone: '136156489',
	          address: 'ggg'
	        },
	        {
	          id: '2014231682',
	          name: 'zkkkm',
	          age: '15',
	          phone: '15829',
	          address: 'jnrtigg'
	        }
	      ],
	      person: { // 添加
	        id: '',
	        name: '',
	        age: '',
	        phone: '',
	        address: ''
	      },
	      rules: {
	        id: [{required: true, validator: validateId}],
	        name: [{required: true, message: '姓名不能为空'}],
	        phone: [{required: true, validator: validatePhone}],
	        age: [{required: true, validator: validateAge}],
	        address: [{required: true, message: '地址不能为空'}]
	      },
	      dialogFormVisible: false, // 编辑信息对话框
	      addDialogFormVisible: false, // 添加信息对话框
	      editForm: { // 编辑表单
	        id: '',
	        name: '',
	        age: '',
	        phone: '',
	        address: ''
	      },
	      formLabelWidth: '50px',
	      searchString: ''
	    }
	  },
	  computed: {
	    searchPeople () {
	      if (this.searchString === '') {
	        return this.people
	      }
	      var searchString = this.searchString.trim().toLowerCase()
	      var result = this.people.filter((item) => {
	        if (item.id.toLowerCase().indexOf(searchString) !== -1 || item.name.toLowerCase().indexOf(searchString) !== -1 || item.age.toLowerCase().indexOf(searchString) !== -1 || item.phone.toLowerCase().indexOf(searchString) !== -1 || item.address.toLowerCase().indexOf(searchString) !== -1) {
	          return item
	        }
	      })
	      return result
	    }
	  },
	  mounted () {
	    var result = 'http://localhost:5500/studentmanage'
	    axios.get(result).then((res) => {
	      this.people = res.data
	    })
	  },
	  methods: {
	    handleAdd (person) { // 添加操作
	      this.addDialogFormVisible = true
	      // this.$refs.person.resetFields()
	    },
	    handleEdit (index, row) { // 编辑操作
	      // console.log(index + row)
	      this.dialogFormVisible = true
	      this.editForm = this.people[index]
	    },
	    editFormEnsure () { // 编辑表单确定按钮
	      this.dialogFormVisible = false
	      this.$message({
	        message: '编辑成功!',
	        type: 'success'
	      })
	    },
	    editFormCancle () { // 编辑表单取消按钮
	      this.dialogFormVisible = false
	      this.$message({
	        message: '已取消编辑!',
	        type: 'info'
	      })
	    },
	    handleDelete (index, row) { // 删除操作
	      // console.log(index + row)
	      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        this.people.splice(index, 1)
	        this.$message({
	          type: 'success',
	          message: '删除成功!'
	        })
	      }).catch(() => {
	        this.$message({
	          type: 'info',
	          message: '已取消删除!'
	        })
	      })
	    },
	    addFormCancle () { // 添加取消
	      this.addDialogFormVisible = false
	      this.$message({
	        message: '已取消添加!',
	        type: 'info'
	      })
	    },
	    addFormEnsure (form) { // 添加确定
	      this.$refs[form].validate((valid) => {
	        if (valid) {
	          for (var i = 0; i < this.people.length; i++) {
	            // console.log(typeof (this.person.id) + '    ' + typeof (Number(this.people[i].id)))
	            if (this.person.id === Number(this.people[i].id)) {
	              this.$message({
	                message: '学号已存在!',
	                type: 'warning'
	              })
	              return
	            }
	          }
	          this.people.push(this.person)
	          this.addDialogFormVisible = false
	          this.$message({
	            message: '添加成功!',
	            type: 'success'
	          })
	          this.person = { // 添加
	            id: '',
	            name: '',
	            age: '',
	            phone: '',
	            address: ''
	          }
	        } else {
	          console.log('error submit!!')
	          return false
	        }
	      })
	    },
	    searchFor () {
	      console.log('icon-search')
	    },
	    resetAddForm (form) { // 重置
	      this.$refs[form].resetFields()
	    }
	  }
	}
</script>
<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
	.el-table th>.cell{ /*表头居中*/
		text-align: center;
	}
</style>