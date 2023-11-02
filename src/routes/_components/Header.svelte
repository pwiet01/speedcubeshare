<script lang="ts">
  import logoFull from '$lib/assets/images/speedcubeshare_logo_full.png';
  import { globalConfig } from '$lib/config/globalConfig';
  import ProfileNavigation from './ProfileNavigation.svelte';
  import MainNavigationItems from './MainNavigationItems.svelte';

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
          <ul class="menu menu-horizontal">
            <MainNavigationItems {debug} />
          </ul>

          <div class="dropdown dropdown-end">
            <input type="hidden" id="profile-dropdown-input" />
            <label tabindex="-1" class="cursor-pointer" for="profile-dropdown-input">
              <img
                src="https://yt3.googleusercontent.com/ytc/APkrFKZ9USK2IB7p9lhmvJPbDBxbJKLVCwRoBVOSF19JGw=s176-c-k-c0x00ffffff-no-rj"
                alt="User"
                class="rounded-full w-10 h-10"
              />
            </label>
            <div
              class="menu dropdown-content z-40 px-2 py-4 border shadow-lg bg-base-100 rounded-box w-52 mt-4"
            >
              <ProfileNavigation />
              <a href="/" class="btn btn-sm btn-error w-full">Logout</a>
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
        <ProfileNavigation {closeDrawer} />
        <div class="divider" />
        <ul class="menu px-0">
          <MainNavigationItems {debug} {closeDrawer} />
        </ul>
      </div>
      <a on:click={closeDrawer} href="/" class="btn btn-error w-full self-end">Logout</a>
    </div>
  </div>
</div>

<style>
  a {
    opacity: 100%;
  }
</style>
