<script lang="ts">
  import { t } from '$lib/translations';

  export let debug = false;
  export let closeDrawer = () => {};
</script>

{#if debug}
  <li><a on:click={closeDrawer} href="/debug">{$t('common.pageTitle.debug')}</a></li>
{/if}

<style>
  a {
    opacity: 100%;
  }
</style>
