<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: [String, null],
    required: true,
  },
  owner: {
    type: Object,
    required: true,
  },
  hasWiki: {
    type: Boolean,
    required: true,
  },
});

const { name, description, owner, hasWiki } = props;
</script>

<template>
  <van-card
    :title="name"
    :desc="description"
    :class="{ 'card--light-blue': !hasWiki }"
  >
    <template #footer>
      <span>Owner: {{ owner.login }}</span>
    </template>
  </van-card>
</template>

<style>
.card--light-blue {
  background-color: #add8e6;
}
</style>
