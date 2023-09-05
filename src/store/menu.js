import { getMenuSort1, getMenuSort2, getMenuSort3 } from "../api/menu.js";

const MenuAbout = {
  namespaced: true,
  state() {
    return {
      // menu2Data: [], //二级分类数据
      // menu3Data: [], //三级分类数据
    };
  },
  actions: {
    // async get2Data(context, menu1Data) {
    //   //获取二级分类数据
    //   let menu2Data = [];
    //   for (const item of menu1Data) {
    //     // 获取二级分类数据
    //     const res2 = await getMenuSort2(item.id);
    //     menu2Data.push(res2.data.data);
    //     menu2Data = menu2Data.map((p) => {
    //       return p.filter((item) => item.name.trim() != "");
    //     });
    //   }
    //   console.log("进一步加工后的二级分类数据22222", menu2Data);
    //   context.commit("GET2DATA", menu2Data);
    //   //获取三级分类数据
    //   context.dispatch("get3Data", menu2Data);
    // },

    // get3Data(context, menu2Data) {
    //   let menu3Data = [];
    //   // 使用 Promise.all 来等待所有三级分类请求完成
    //   const fetchPromises = [];
    //   menu2Data.map((p) => {
    //     let menu3Item = [];
    //     //p指的是某个一级分类的所有二级分类
    //     p.map((item) => {
    //       //item指的是里面的某个二级分类
    //       //发起三级分类请求
    //       const fetchPromise = getMenuSort3(item.id).then((res3) => {
    //         menu3Item.push(res3.data.data);
    //       });
    //       fetchPromises.push(fetchPromise);
    //     });
    //     menu3Data.push(menu3Item);
    //   });
    //   // 使用 Promise.all 等待所有三级分类请求完成后进行处理
    //   Promise.all(fetchPromises).then(() => {
    //     console.log("actions-menu3Data", menu3Data);
    //     // 对每个一级分类下的二级分类的三级分类进行排序和加工
    //     // console.log('111111');
    //     menu3Data = menu3Data.map((p) => {
    //       //1-按照二级分类进行排序
    //       p.sort((a, b) => (a[0]?.category2Id || 0) - (b[0]?.category2Id || 0));
    //       //2- // 去除名字为空的
    //       const processMenu3Data = p.map((items) => {
    //         return items.filter((item) => item.name.trim() !== "");
    //       });
    //       //3-过滤掉长度为0的items
    //       const filteredItems = processMenu3Data.filter((items) => items.length !== 0);
    //       return filteredItems;
    //     });
    //     console.log("加工后的menu3Data", menu3Data);
    //     context.commit("GET3DATA", menu3Data);
    //   });
    // },

  },
  mutations: {
    // GET2DATA(state, value) {
    //   console.log("mutation-GET2DATA", value);
    //   state.menu2Data = value;
    //   //获取二级分类、三级分类的数据
    //   // getMenuSort2(this.category1Id).then((res2) => {
    //   //     this.menu2Data = res2.data.data
    //   //     console.log('二级分类数据menu2Data', this.menu2Data);
    //   //     //过滤出二级分类菜单中name为空的
    //   //     this.menu2Data = this.menu2Data.filter(p => p.name.trim() != '')
    //   //     console.log('进一步加工后的二级分类数据22222', this.menu2Data);
    //   //     this.menu2Data.map((p) => {
    //   //         if (p.id) {
    //   //             getMenuSort3(p.id).then((res) => {
    //   //                 // console.log('获取三级分类数据',res);
    //   //                 if (res.data.data.length != 0) {
    //   //                     this.menu3Data.push(res.data.data)
    //   //                     // console.log('menu3Data', this.menu3Data)
    //   //                     //对得到的三级分类数据按照二级分类id进行升序排序
    //   //                     this.menu3Data = this.menu3Data.sort((a, b) => a[0].category2Id - b[0].category2Id)
    //   //                     console.log('排序后的三级分类菜单', this.menu3Data);
    //   //                     // //对排序后的三级分类数据进行加工-去除名字为空的
    //   //                     this.menu3Data = this.menu3Data.map((p) => {
    //   //                         return p.filter(item => item.name.trim() !== '')
    //   //                     })
    //   //                     console.log('进一步加工后的三级分类数据33333', this.menu3Data);
    //   //                 }
    //   //             })
    //   //         }
    //   //     })
    //   // })
    // },

    // GET3DATA(state, value) {
    //   console.log("mutation-GET3DATA", value);
    //   state.menu3Data = value;
    // },
  },
};

export default MenuAbout;

// menu3Data.map((p)=>{
//     p.sort((a, b) => (a[0]?.category2Id || 0) - (b[0]?.category2Id || 0));

// })
// // console.log('2222222');
// menu3Data = menu3Data.map((p) => {
//   return p.map((items) => {
//     // 去除名字为空的项目
//     return items.filter((item) => item.name.trim() !== "");
//   });
// });
// menu3Data=menu3Data.map((p)=>{
//     return p.filter((a)=>a.length!=0)
// })
