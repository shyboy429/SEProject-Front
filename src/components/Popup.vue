<template>
  <div class="popup">
    <div class="popup-content">
      <h2>手动组卷</h2>
      <div class="columns">
        <div class="column">
          <h3>列表 1</h3>
          <ul>
            <li v-for="item in items" :key="item.id">
              <input type="checkbox" :id="item.id" v-model="selectedItems" :value="item.id">
              <label :for="item.id">{{ item.name }}</label>
            </li>
          </ul>
        </div>
        <div class="buttons">
          <button @click="moveToRight">></button>
          <button @click="moveToLeft"><</button>
        </div>
        <div class="column">
          <h3>列表 2</h3>
          <ul>
            <li v-for="item in selectedItemsList" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <button @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data() {
    return {
      items: [
        { id: 1, name: '程序员哥哥好' },
        { id: 2, name: '亲哥哥是不是不' },
        { id: 3, name: '安哥哥哥哥不是不' },
        { id: 4, name: '安哥哥哥哥是个不是' },
      ],
      selectedItems: []
    };
  },
  computed: {
    selectedItemsList() {
      return this.items.filter(item => this.selectedItems.includes(item.id));
    }
  },
  methods: {
    moveToRight() {
      // Implement your logic here
    },
    moveToLeft() {
      // Implement your logic here
    }
  }
};
</script>

<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  width: 600px;
}

.columns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.column {
  flex: 1;
  margin: 0 1rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button {
  margin: 0.5rem 0;
}
</style>
