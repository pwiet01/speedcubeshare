<script lang="ts">
  import { onMount } from 'svelte';

  export let timeout: number | undefined = 4000;
  export let position = 'toast-top toast-end top-16';
  export let type = 'alert-success';

  let isMounted = false;
  export let visible = true;
  $: if (isMounted) startVisibilityTimeout(visible, timeout);

  let currentTimeout: number | undefined = undefined;

  function startVisibilityTimeout(currentlyVisible: boolean, timeout: number | undefined) {
    clearTimeout(currentTimeout);

    if (currentlyVisible && timeout) {
      currentTimeout = window.setTimeout(() => (visible = false), timeout);
    }
  }

  onMount(() => {
    isMounted = true;
    return () => clearTimeout(currentTimeout);
  });
</script>

{#if visible}
  <div class="toast {position}">
    <div class="alert {type}">
      <span>
        <slot />
      </span>
    </div>
  </div>
{/if}
