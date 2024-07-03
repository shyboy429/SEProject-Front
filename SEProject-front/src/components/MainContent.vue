<template>
  <div class="main-content">
    <div class="toolbar">
      <input type="text" placeholder="请输入名称" />
      <button>搜索</button>
      <button>新增</button>
      <button>报表导出</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>测试试卷</td>
          <td>
            <button @click="showPopup">手动组卷</button>
            <button>自动组卷</button>
            <button>编辑</button>
            <button>删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  methods: {
    showPopup() {
      this.$emit('showPopup');
    }
  }
};
</script>

<style>
.main-content {
  flex: 1;
  padding: 1rem;
  background: #f0f2f5;
}

.toolbar {
  margin-bottom: 1rem;
}

.toolbar input {
  margin-right: 0.5rem;
  padding: 0.5rem;
}

.toolbar button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.5rem;
}
</style>
