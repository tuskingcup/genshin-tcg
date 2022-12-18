<script setup>
defineProps({
  weapon: {
    type: Object,
    required: true,
  }
});
</script>
 
<template>
    <div class="  bg-zinc-800 text-theme-1 rounded-lg max-w-lg text-lg text-center w-full h-full border border-theme-2 ">
        <div class="bg-theme-4">
        <div class="text-yellow-500">{{weapon.name}}</div>
        <div><span class="text-yellow-500">Cost: </span>{{weapon.cost}}</div>
        <div><span class="text-yellow-500">Group: </span>{{weapon.group}}</div>
        <div><span class="text-yellow-500">Pick: </span>{{weapon.pick==undefined?0:weapon.pick}}</div></div>
        <div class=" bg-zinc-800 text-theme-1  pt-2"><span class="text-yellow-500">Effect: </span>{{weapon.effect}}</div>
    </div>
</template>
 
<style scoped>

</style>