import { Collection, Model, Query, Rule } from "~components/models/memory-record";

export const state = {
  menus: [],
  menu:  {},
  target: null
};

export const mutations = {
  menus (state, menus) {
  	menus.map((menu)=> {
  		state.menu[menu.name] = menu;
  	});
    state.menus = menus;
  },
  menu (state, menu) {
  	state.menu[menu.name] = menu;
    state.menus.push(menu);
  },
  menu_toggle (state, name) {
    var menu = state.menu[name];
    state.target = name;
  }
};

