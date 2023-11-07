<script lang="ts">
  export let value = '';

  export let label: string | undefined = undefined;
  export let error: string | undefined = undefined;
  export let info: string | undefined = undefined;

  export let inputId: string;
  export let inputName = inputId;

  export let wrapperClass = '';
</script>

<div class="form-control w-full {wrapperClass}">
  {#if label}
    <label class="block mb-1" for={inputId}>
      <span class="label-text">{label}</span>
    </label>
  {/if}

  <input
    bind:value
    class="input input-bordered transition-colors w-full{error ? ' input-error' : ''}"
    id={inputId}
    name={inputName}
    {...$$restProps}
  />

  {#if error}
    <label class="block" for={inputId}>
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {/if}

  {#if info}
    <label class="flex items-center gap-2 mt-2" for={inputId}>
      <i class="fa-solid fa-circle-info text-info" />
      <span class="label-text-alt text-info">{info}</span>
    </label>
  {/if}
</div>
