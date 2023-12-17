<script lang="ts">
  import { t } from '$lib/translations';
  import { enhance } from '$app/forms';

  let signOutLoading = false;
</script>

<section class="mt-12 p-4 bg-error bg-opacity-50 rounded-xl sm:w-fit sm:min-w-[20rem]">
  <h2 class="mb-2 text-2xl font-bold">{$t('settings.dangerSection.title')}</h2>

  <div class="flex flex-col">
    <form
      method="post"
      action="?/signOut"
      use:enhance={({ cancel }) => {
        if (!confirm($t('settings.dangerSection.confirmSignOut'))) {
          cancel();
          return;
        }

        signOutLoading = true;
      }}
    >
      <button type="submit" class="btn btn-error w-fit mt-4" disabled={signOutLoading}>
        <span class="loading loading-dots {signOutLoading ? '' : 'hidden'}" />
        {$t('settings.dangerSection.signOutOnAllDevices')}
      </button>
    </form>
  </div>
</section>
