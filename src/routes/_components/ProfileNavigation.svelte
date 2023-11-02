<script lang="ts">
  import { t } from '$lib/translations';

  export let closeDrawer = () => {};
</script>

<div class="mb-2 px-4 w-full flex gap-4 items-center justify-start">
  <img
    src="https://yt3.googleusercontent.com/ytc/APkrFKZ9USK2IB7p9lhmvJPbDBxbJKLVCwRoBVOSF19JGw=s176-c-k-c0x00ffffff-no-rj"
    alt="User"
    class="rounded-full w-10 h-10"
  />

  <p class="text-lg">pwiet01</p>
</div>

<ul class="menu px-0">
  <li><a on:click={closeDrawer} href="/users/pwiet01">{$t('common.overview')}</a></li>
  <li><a on:click={closeDrawer} href="/settings">{$t('common.pageTitle.settings')}</a></li>
</ul>

<style>
  a {
    opacity: 100%;
  }
</style>
