declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<unknown, Record<string, never>, unknown>;
  export default component;
}
