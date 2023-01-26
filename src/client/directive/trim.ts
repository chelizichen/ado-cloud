import {  App, DirectiveBinding, VNode } from "vue";

const trim_directive = (app:App<Element>) => {
  app.directive("trim", {
    "updated": function (
      el: any,
      binding: DirectiveBinding<any>,
      vnode: VNode<any, any, { [key: string]: any }>,
    ) {
      el.innerHTML = (el.innerHTML as string).replace(/\s+/g, "")
    },
  });
}
export { trim_directive };