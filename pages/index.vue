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
    <value name="One" :input="selected"/>
    <value name="Two" :input="selected"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['a', 'b', 'c'],
      selected: 'a'
    }
  }
}
</script>
