<script lang="ts">
  import { t } from '$lib/translations';
  import { user } from '$lib/ts/stores';

  export let closeDrawer = () => {};
</script>

{#if $user}
  <div class="mb-4 px-4 w-full flex justify-between items-center">
    <img
      src="https://yt3.googleusercontent.com/ytc/APkrFKZ9USK2IB7p9lhmvJPbDBxbJKLVCwRoBVOSF19JGw=s176-c-k-c0x00ffffff-no-rj"
      alt="User"
      class="rounded-full w-9 h-9"
    />

    <p class="font-bold w-4/5 break-words">{$user.display_name}</p>
  </div>

  <ul class="menu px-0">
    <li><a on:click={closeDrawer} href="/users/{$user.username}">{$t('common.overview')}</a></li>
    <li><a on:click={closeDrawer} href="/settings">{$t('common.pageTitle.settings')}</a></li>
  </ul>
{:else}
  <a href="/login" class="btn btn-sm btn-primary w-full">{$t('common.auth.signIn')}</a>
{/if}

<style>
  a {
    opacity: 100%;
  }
</style>
