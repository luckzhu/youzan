<template>
  <div>
    <div class="container" style="min-height: 597px;" v-if="lists && lists.length">
      <div class="block-list address-list section section-first js-no-webview-block">
        <a
          class="block-item js-address-item address-item"
          @click="updateAddr(list)"
          v-for="list in lists"
          :key="list.id"
          :class="{'address-item-default':list.isDefault}"
        >
          <div class="address-title">{{list.name}} {{list.tel}}</div>
          <p>{{list.provinceName+list.cityName+'市'+list.districtName+list.address}}</p>
        </a>
      </div>
    </div>

    <div v-else>
      <p>没有地址，请添加</p>
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        :to="{name: 'form', query: {type: 'add'}}"
      >新增地址</router-link>
    </div>
  </div>
</template>


<script>
import Address from "js/addrService.js";
export default {
  data() {
    return {
      lists: null
    };
  },
  created() {
    Address.lists().then(res => {
      this.lists = res.data.lists;
    });
  },
  methods: {
    updateAddr(list) {
      this.$router.push({name: 'form' , query:{
        type: 'edit', instance: list
      }});
    }
  }
};
</script>


