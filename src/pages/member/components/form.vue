<template>
  <div class="container" style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value />
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20" />
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11" />
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="p.value" v-for="p in addressData.list">{{p.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="c.value" v-for="c in cityLists">{{c.label}}</option>
            </select>
            <select class="js-county-selector" v-model="districtValue" name="area_code" data-code>
              <option value="-1">选择地区</option>
              <option :value="d.value" v-for="d in districtLists">{{d.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input
            type="text"
            placeholder="街道门牌信息"
            name="address_detail"
            v-model="address"
            maxlength="100"
          />
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="addAddr">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div
      class="block section js-delete block-control-btn"
      @click="removeAddr"
      v-show="type==='edit'"
    >
      <div class="block-item c-red center">删除</div>
    </div>
    <div
      class="block stick-bottom-row center js-save-default"
      v-show="type==='edit'"
      @click="setDefault"
    >
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import url from "js/api.js";
export default {
  data() {
    return {
      id: "",
      name: "",
      tel: "",
      address: "",
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      type: "",
      instance: "",
      addressData: null,
      cityLists: null,
      districtLists: null
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },
  created() {
    let query = this.$route.query;
    this.type = query.type;
    this.instance = query.instance;
    this.addressData = require("js/address.json");

    if (this.type === "edit") {
      let ad = this.instance;
      this.name = ad.name;
      this.tel = ad.tel;
      this.address = ad.address;
      this.provinceValue = parseInt(ad.provinceValue);
      this.id = ad.id;
    }
  },
  methods: {
    addAddr() {
      let {
        name,
        tel,
        address,
        provinceValue,
        cityValue,
        districtValue
      } = this;
      let data = {
        name,
        tel,
        address,
        provinceValue,
        cityValue,
        districtValue
      };
      if (this.type === "add") {
        //模拟ID,实际上应由后台返回
        data.id = parseInt(Math.random() * 1000);
        this.$store.dispatch("addAction", data);
      }
      if (this.type === "edit") {
        data.id = this.id;
        this.$store.dispatch("updateAction", data);
      }
    },
    removeAddr() {
      if (window.confirm("确认要删除吗？")) {
        this.$store.dispatch("removeAction", this.id);
      }
    },
    setDefault() {
      this.$store.dispatch("setDefaultAction", this.id);
    }
  },
  watch: {
    lists: {
      handler() {
        this.$router.go(-1);
      },
      deep: true
    },
    provinceValue(val) {
      if (val === -1) return;
      let list = this.addressData.list;
      let index = list.findIndex(item => {
        return item.value === val;
      });
      this.cityLists = list[index].children;
      this.cityValue = -1;
      this.districtValue = -1;
      if (this.type === "edit") {
        this.cityValue = parseInt(this.instance.cityValue);
      }
    },
    cityValue(val) {
      if (val === -1) return;
      let list = this.cityLists;
      let index = list.findIndex(item => {
        return item.value === val;
      });
      this.districtLists = list[index].children;
      this.districtValue = -1;
      if (this.type === "edit") {
        this.districtValue = parseInt(this.instance.districtValue);
      }
    }
  }
};
</script>

<style scoped>
</style>