<template>
	<div>
		<div>
			<el-table :data="people" border style="width: 100%">
			    <el-table-column prop="name" label="用户"></el-table-column>
			    <el-table-column prop="password" label="密码"></el-table-column>
				<el-table-column label="操作">
			      <template scope="scope">
			        <el-button size="small" @click="handleEdit(scope.$index, scope.row)" style="margin:2px 0;padding:7px 5px"><i class="el-icon-edit" style="margin-right:5px"></i>密码修改</el-button>
			        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" style="margin:2px 0;padding:7px 5px"><i class="el-icon-delete" style="margin-right:5px"></i>用户删除</el-button>
			      </template>
			    </el-table-column>
		  </el-table>
		</div>
		<div style="text-align:left">
			<el-dialog title="密码修改" :visible.sync="dialogFormVisible">
			  <el-form :model="editForm">
			    <el-form-item label="用户" :label-width="formLabelWidth">
			      <el-input v-model="editForm.name" auto-complete="off" disabled></el-input>
			    </el-form-item>
			    <el-form-item label="密码" :label-width="formLabelWidth">
			      <el-input v-model="editForm.password" auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			  	<!-- <template scope="scope"> -->
			   		<el-button @click="editFormCancle">取 消</el-button>
			   	 	<el-button type="primary" @click="editFormEnsure">确 定</el-button>
				<!-- </template> -->
			  </div>
			</el-dialog>
	  	</div>
	</div>
</template>
<script type="text/javascript">
	export default {
	  data () {
	    return {
	      people: [
	        // {name: '1', password: '1'},
	        // {name: '1', password: '1'},
	        // {name: '1', password: '1'},
	        // {name: '1', password: '1'},
	        // {name: '1', password: '1'},
	        // {name: '1', password: '1'},
	        // {name: '1', password: '1'}
	      ],
	      dialogFormVisible: false,
	      formLabelWidth: '50px',
	      editForm: {
	        name: '',
	        password: ''
	      }
	    }
	  },
	  created () {
	    console.log(localStorage)
	    for (var i = 0; i < localStorage.length; i++) {
	      // console.log('name=' + localStorage.key(i) + '  ' + 'password=' + localStorage.getItem(localStorage.key(i)))
	      // var person = {}
	      // person.name = localStorage.key(i)
	      // person.password = localStorage.getItem(localStorage.key(i))
	      this.people.push({name: localStorage.key(i), password: localStorage.getItem(localStorage.key(i))})
	    }
	  },
	  methods: {
	    handleDelete (index, row) {
	      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        localStorage.removeItem(localStorage.key(index))
	        var people = []
	        for (var i = 0; i < localStorage.length; i++) {
	          people.push({name: localStorage.key(i), password: localStorage.getItem(localStorage.key(i))})
	        }
	        this.people = people
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
	    handleEdit (index, row) {
	      this.dialogFormVisible = true
	      // this.editForm.name = localStorage.key(index)
	      // this.editForm.password = localStorage.getItem(localStorage.key(index))
	      this.editForm = this.people[index]
	    },
	    editFormCancle () {
	      this.dialogFormVisible = false
	      this.$message({
	        type: 'info',
	        message: '已取消修改!'
	      })
	    },
	    editFormEnsure () {
	      if (this.editForm.password === '' || this.editForm.password === null) {
	        this.$message({
	          type: 'warning',
	          message: '密码不能为空!'
	        })
	        return
	      }
	      localStorage.setItem(this.editForm.name, this.editForm.password)
	      this.dialogFormVisible = false
	      this.$message({
	        type: 'success',
	        message: '修改成功!'
	      })
	    }
	  }
	}
</script>