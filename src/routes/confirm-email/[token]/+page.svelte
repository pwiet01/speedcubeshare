<script lang="ts">
  import { t } from '$lib/translations';

  export let data;
</script>

<div class="mx-auto flex-1 flex flex-col justify-center items-center">
  <p class="{data.success ? 'text-success' : 'text-error'} text-2xl">{$t(data.message)}</p>
  <a class="mt-2 p-1" href="/">
    {$t('common.pageTitle.home')}
    <i class="fa-solid fa-arrow-right ml-1" />
  </a>
</div>
