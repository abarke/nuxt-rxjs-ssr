
<template>
  <div class="box m-6">
    <p class="title pb-4">Testing SSR and various rendering scenarios</p>
    <p class="subtitle">Value A: {{ valueA$ }}</p>
    <p class="subtitle">Value B: {{ valueB$ }}</p>
    <p class="subtitle">Value C: {{ valueC$ }}</p>
    <p class="subtitle">Value D: {{ valueD$ }}</p>
    <p class="subtitle">fetchData: {{ fetchValue }}</p>
    <p class="subtitle">asyncData: {{ asyncDataValue }}</p>
  </div>
</template>

<script>
import { interval, map, takeWhile, of, from, startWith } from 'rxjs';

export default {
  data() {
    return {
      fetchValue: null
    }
  },

  async fetch() {
    const { blog } = await fetch('https://api.github.com/orgs/nuxt').then(res => res.json())
    this.fetchValue = blog
  },

  async asyncData() {
    const { url } = await fetch('https://api.github.com/orgs/nuxt').then(res => res.json())
    return {
      asyncDataValue: url
    }
  },

  subscriptions() {
    const channel$ = this.$watchAsObservable('channel', { immediate: true }).pipe(
      map((event) => event.newValue),
    )

    const valueA$ = of('observables that complete immediately work on the server')

    const valueB$ = from(new Promise(resolve => setTimeout(() => resolve('promise resolve'), 1000)))

    const valueC$ = process.server ? of(this.fetchValue || 'not ready') : interval(1000).pipe(
      startWith(-1),
      takeWhile(() => process.client),
    )
    const valueD$ = process.server ? of(this.asyncDataValue || 'not ready') : interval(1000).pipe(
      startWith(-1),
      takeWhile(() => process.client),
    )

    return {
      channel$,
      valueA$,
      valueB$,
      valueC$,
      valueD$,
    }
  },
}
</script>

