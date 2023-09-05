import { searchResult } from "../api/search.js";
const SearchAbout = {
  namespaced: true,
  state() {
    return {
      searchResult: [], //搜索结果
      tags: [], //顶部标签数组
      keyword: "", //搜索关键词
    };
  },
  actions: {
    //发起搜索请求
    async search(context, searchObj) {
      let res = await searchResult(searchObj);
      console.log("搜索得到结果", res.data);
      context.commit("SEARCH", res.data.data);
    },
  },
  mutations: {
    //保存关键词
    saveKeyword(state, value) {
      console.log("保存关键词", value);
      state.keyword = value;
    },
    //清空关键词
    clearKeyword(state) {
      console.log("清空关键词");
      state.keyword = "";
    },
    //清空tags
    clearTags(state) {
      state.tags = [];
    },
    //搜索请求-保存结果
    SEARCH(state, value) {
      state.searchResult = value;
    },
    //将搜索的keyword存入tags
    ADDSEARCHTAG(state, value) {
      console.log("mutations-添加搜索tag", value);
      state.keyword = value;
      state.tags = [value];
    },
    //点击一二三级分类菜单存储tag
    ADDCLICKTAGS(state,value){
      console.log("mutations-添加搜索tag", value);
      // state.keyword = value;
      state.tags = [value];
    },
    //添加品牌或属性的tags
    ADDTAGS(state, value) {
      console.log("mutations-添加品牌/属性tag", value);
      state.tags.push(value);
    },
  },
};

export default SearchAbout;
