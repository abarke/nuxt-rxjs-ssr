<template>
  <article class="box notification is-primary is-4 m-6">
    <p class="title">Component {{ name }}</p>
    <p class="title is-6">Selected: {{ input$ }}</p>
    <p class="title is-6">Value: {{ value$ }}</p>
  </article>
</template>

<script>
import { interval, map, switchMap } from 'rxjs'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    input: {
      type: String,
      required: true
    },
  },

  subscriptions() {
    const input$ = this.$watchAsObservable('input', { immediate: true }).pipe(
      map((event) => event.newValue)
    )

    const value$ = input$.pipe(
      switchMap((input) => interval(1000).pipe(
        map((count) => input + count))
      )
    )

    return {
      input$,
      value$
    }
  }
}
</script>
