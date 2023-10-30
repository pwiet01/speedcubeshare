<script lang="ts">
  import '../app.css';
  import '@fontsource/lato';
  import Header from './_components/Header.svelte';
  import Footer from './_components/Footer.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { globalConfig } from '$lib/config/globalConfig';

  export let data;

  $: pageTitle = $page.error
    ? `(${$page.status}) ${$page.error.message ?? 'Error'} | ${globalConfig.meta.defaultTitle}`
    : $page.data?.meta?.title
    ? `${$page.data.meta.title} | ${globalConfig.meta.defaultTitle}`
    : globalConfig.meta.defaultTitle;

  $: keywords =
    globalConfig.meta.defaultKeywords +
    ($page.data?.meta?.keywords ? ', ' + $page.data.meta.keywords : '');

  $: description = $page.data?.meta?.description ?? globalConfig.meta.defaultDescription;

  onMount(() => {
    setDocHeight();
  });

  function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }
</script>

<Header debug={data.debug} />

<main>
  <slot />
</main>

<Footer />

<svelte:window on:resize={setDocHeight} on:orientationchange={setDocHeight} />

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="keywords" content={keywords} />
  <meta name="description" content={description} />
</svelte:head>
