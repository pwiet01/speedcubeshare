<script lang="ts">
  export let closeDrawerCallback: () => void;
</script>

<a on:click={closeDrawerCallback} href="/users/pwiet01" class="btn btn-ghost w-full">
  <div class="w-full flex gap-4 items-center justify-start">
    <img
      src="https://yt3.googleusercontent.com/ytc/APkrFKZ9USK2IB7p9lhmvJPbDBxbJKLVCwRoBVOSF19JGw=s176-c-k-c0x00ffffff-no-rj"
      alt="User"
      class="rounded-full w-10 h-10"
    />

    <div class="text-lg">pwiet01</div>
  </div>
</a>

<style>
  a {
    opacity: 100%;
    padding: 1rem;
    height: auto;
    text-transform: none;
  }
</style>
