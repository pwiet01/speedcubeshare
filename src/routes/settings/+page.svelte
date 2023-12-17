<script lang="ts">
  import SettingsSectionDanger from './_components/SettingsSectionDanger.svelte';
  import { t } from '$lib/translations';
  import SettingsSectionAccount from './_components/SettingsSectionAccount.svelte';
  import FormLayout from '$lib/components/form/FormLayout.svelte';

  export let data;
  export let form;
</script>

<FormLayout maxWidth="" bodyWrapperClass="" action="?/save">
  <SettingsSectionAccount user={data.user} {form} />

  <div class="divider" />

  <div slot="actions">
    <button type="submit" class="btn btn-primary w-fit">{$t('settings.save')}</button>
  </div>
</FormLayout>

<SettingsSectionDanger />
