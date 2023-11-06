<script lang="ts">
  export let label: string | undefined = undefined;
  export let error: string | undefined = undefined;

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
    class="input input-bordered w-full{error ? ' input-error' : ''}"
    id={inputId}
    name={inputName}
    {...$$restProps}
  />

  {#if error}
    <label class="block mb-1" for={inputId}>
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {/if}
</div>
