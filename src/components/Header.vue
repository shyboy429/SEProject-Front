<template>
  <header class="header">
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <div class="user-info">
      <span>张</span>
      <img src="path/to/avatar.jpg" alt="User Avatar" class="avatar" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3b86ff;
  padding: 10px;
  color: #fff;
}

.logo {
  height: 40px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info .avatar {
  border-radius: 50%;
  height: 40px;
  margin-left: 10px;
}
</style>
