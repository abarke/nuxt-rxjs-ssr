<template>
  <div>
    <b-field label="Channel" class="ml-6">
      <b-select placeholder="Select a channel" v-model="selected">
        <option
          v-for="option in options"
          :value="option"
          :key="option"
        >
          {{ option }}
        </option>
      </b-select>
    </b-field>
    <div class="buttons ml-6">
      <b-button type="is-primary" @click="showComponent = !showComponent">Toggle Component</b-button>
    </div>
    <div class="tile is-ancestor m-6">
      <value name="One" :channel="selected"/>
      <value name="Two" :channel="selected"/>
      <value v-if="showComponent" name="Three" :channel="selected"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['A', 'B', 'C'],
      selected: 'A',
      showComponent: false
    }
  },
}
</script>
