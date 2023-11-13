<script lang="ts">
  import '../app.css';
  import '@fontsource/lato/400.css';
  import '@fontsource/lato/700.css';
  import '$lib/assets/fontawesome/css/all.min.css';
  import Header from './_components/Header.svelte';
  import Footer from './_components/Footer.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { globalConfig } from '$lib/config/globalConfig';
  import { t } from '$lib/translations';
  import type { Page } from '@sveltejs/kit';
  import { dev } from '$app/environment';
  import { getFlash } from 'sveltekit-flash-message';
  import Toast from '$lib/components/Toast.svelte';

  $: pageTitle = getPageTitle($page);

  $: keywords =
    globalConfig.meta.defaultKeywords +
    ($page.data?.meta?.keywords ? ', ' + $page.data.meta.keywords : '');

  $: description = $page.data?.meta?.description ?? globalConfig.meta.defaultDescription;

  const titleSuffix = ` | ${globalConfig.meta.defaultTitle}`;

  const maxWidthMapping: { [key: string]: string } = {
    small: 'max-w-[50rem]',
    max: 'max-w-[110rem]',
  };

  const flash = getFlash(page);

  onMount(() => {
    setDocHeight();
  });

  function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }

  function getPageTitle(page: Page) {
    if (page.error) {
      return `(${page.status}) ${$t(page.error.message ?? 'error.error')}`;
    }

    if (!page.data?.meta?.title) {
      return globalConfig.meta.defaultTitle;
    }

    let title = page.data.meta.title;
    if (!page.data.meta.disableTitleTranslation) {
      title = $t(title);
    }

    return title;
  }
</script>

<Header debug={dev} />

<main
  class="flex flex-col flex-1 pt-6 pb-10 {maxWidthMapping[
    $page.data?.layout?.maxWidth ?? 'max'
  ]} mx-auto w-full"
>
  {#if !$page.error && $page.data?.layout?.showTitle}
    <h1 class="mb-6 text-4xl">{pageTitle}</h1>
  {/if}

  <slot />
</main>

<Footer />

<svelte:window on:resize={setDocHeight} on:orientationchange={setDocHeight} />

<svelte:head>
  <title>{pageTitle + ($page.error || $page.data?.meta?.title ? titleSuffix : '')}</title>
  <meta name="keywords" content={keywords} />
  <meta name="description" content={description} />
</svelte:head>

{#if $flash}
  <Toast type="alert-{$flash.type}">
    {$t($flash.message)}
  </Toast>
{/if}
