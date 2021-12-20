<template>
  <div class="tile is-parent">
    <div class="tile is-child notification is-primary">
      <p class="title">Component {{ name }}</p>
      <p class="title is-6">Channel {{ channel$ }}</p>
      <p class="title is-6">Value: {{ value$ }}</p>
    </div>
  </div>
</template>

<script>
/**
 * @property Observable input$
 */

import { interval, map, switchMap, takeWhile } from 'rxjs'
import { debug, LogLevel } from '../rxjs/debug';

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      required: true
    },
  },

  subscriptions() {
    const channel$ = this.$watchAsObservable('channel', { immediate: true }).pipe(
      map((event) => event.newValue),
    )

    const value$ = channel$.pipe(
      switchMap((input) => interval(1000).pipe(
        takeWhile(() => process.client),
        debug(LogLevel.TRACE, 'inner'),
        map((count) => input + count)),
      ),
      debug(LogLevel.TRACE, 'outer'),
    )

    return {
      channel$,
      value$
    }
  }
}
</script>
