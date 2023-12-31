<script lang="ts">
  import logoFull from '$lib/assets/images/speedcubeshare_logo_full.png';
  import { globalConfig } from '$lib/config/globalConfig';
  import ProfileNavigation from './ProfileNavigation.svelte';
  import MainNavigationItems from './MainNavigationItems.svelte';
  import { t } from '$lib/translations';
  import { user } from '$lib/ts/stores';
  import LogoutButton from './LogoutButton.svelte';

  export let debug = false;

  let drawerToggleRef: HTMLElement;

  function closeDrawer() {
    drawerToggleRef.click();
  }
</script>

<div class="drawer">
  <input id="menu-drawer" type="checkbox" class="drawer-toggle" bind:this={drawerToggleRef} />
  <div class="drawer-content flex flex-col">
    <header class="body-full-width-section bg-base-200">
      <div class="navbar px-0 justify-between">
        <div>
          <div class="md:hidden mr-5">
            <label
              for="menu-drawer"
              aria-label="open sidebar"
              class="cursor-pointer btn btn-ghost p-2 -ml-2"
            >
              <i class="fa-solid fa-bars" />
            </label>
          </div>
          <a href="/" class="px-0">
            <img src={logoFull} alt="{globalConfig.info.name} Logo" class="h-10 md:h-12" />
          </a>
        </div>
        <div class="hidden md:flex items-center">
          <ul class="menu menu-horizontal mr-2">
            <MainNavigationItems {debug} />
          </ul>

          <div class="dropdown dropdown-end">
            <input type="hidden" id="profile-dropdown-input" />
            <label tabindex="-1" class="cursor-pointer" for="profile-dropdown-input">
              {#if $user}
                <img
                  src="https://yt3.googleusercontent.com/ytc/APkrFKZ9USK2IB7p9lhmvJPbDBxbJKLVCwRoBVOSF19JGw=s176-c-k-c0x00ffffff-no-rj"
                  alt="User"
                  class="rounded-full w-10 h-10"
                />
              {:else}
                <span class="!w-10 fa-stack fa-lg">
                  <i class="fa-solid fa-circle fa-stack-2x text-base-300" />
                  <i class="fa-solid fa-user fa-stack-1x" />
                </span>
              {/if}
            </label>
            <div
              class="menu dropdown-content z-40 px-2 py-4 border shadow-lg bg-base-100 rounded-box mt-4
                {$user ? 'w-72' : 'w-52'}"
            >
              <ProfileNavigation />

              {#if $user}
                <LogoutButton formClass="w-full" buttonClass="w-full btn-sm" />
              {/if}
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>

  <div class="drawer-side z-40">
    <label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay" />
    <div class="flex flex-col justify-between p-4 w-80 min-h-full bg-base-200 opacity-100">
      <div>
        {#if $user}
          <ProfileNavigation {closeDrawer} />
          <div class="divider px-3" />
        {/if}
        <ul class="menu px-0">
          <MainNavigationItems {debug} {closeDrawer} />
        </ul>
      </div>

      {#if $user}
        <LogoutButton
          formClass="w-full self-end"
          buttonClass="w-full"
          submitCallback={closeDrawer}
        />
      {:else}
        <a on:click={closeDrawer} href="/login" class="btn btn-primary w-full self-end">
          {$t('common.auth.signIn')}
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  a {
    opacity: 100%;
  }
</style>
