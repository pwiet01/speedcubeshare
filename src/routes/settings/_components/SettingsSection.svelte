<script lang="ts">
  export let title: string;
  export let wrapperClass = '';
</script>

<section class="py-4">
  <h2 class="mb-2 text-2xl font-bold">{title}</h2>

  <div class={wrapperClass}>
    <slot />
  </div>
</section>
