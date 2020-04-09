<template>
  <div class="sider" v-if="visible">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GuluSider"
};
</script>
