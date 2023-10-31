<script lang="ts">
  import logoFull from '$lib/assets/images/speedcubeshare_logo_full.png';
  import { globalConfig } from '$lib/config/globalConfig';
  import { t } from '$lib/translations';
  import ProfileSideDrawer from './ProfileSideDrawer.svelte';

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
          <div>
            <a href="/" class="px-0">
              <img src={logoFull} alt="{globalConfig.info.name} Logo" class="h-10" />
            </a>
          </div>
        </div>
        <div class="hidden md:flex items-center">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu -->
            {#if debug}
              <li><a href="/debug">{$t('common.pageTitle.debug')}</a></li>
            {/if}
          </ul>

          <a href="/users/pwiet01" class="p-0">
            <div class="rounded-full bg-base-300 w-10 h-10">
              <img
                src="https://yt3.googleusercontent.com/ytc/APkrFKZ9USK2IB7p9lhmvJPbDBxbJKLVCwRoBVOSF19JGw=s176-c-k-c0x00ffffff-no-rj"
                alt="User"
                class="rounded-full w-10 h-10"
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  </div>

  <div class="drawer-side z-40">
    <label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay" />
    <div class="flex flex-col justify-between p-4 w-80 min-h-full bg-base-200 opacity-100">
      <div>
        <ProfileSideDrawer closeDrawerCallback={closeDrawer} />
        <div class="divider" />
        <ul class="menu px-0">
          <!-- Sidebar menu -->
          {#if debug}
            <li><a on:click={closeDrawer} href="/debug">{$t('common.pageTitle.debug')}</a></li>
          {/if}
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
