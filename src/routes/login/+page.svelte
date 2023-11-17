<script lang="ts">
  import { t } from '$lib/translations';
  import FormLayout from '$lib/components/form/FormLayout.svelte';
  import TextInput from '$lib/components/form/TextInput.svelte';
  import { getTranslatedFormErrors } from '$lib/ts/formUtils/formUtilsClient';

  export let form;
  $: formErrors = getTranslatedFormErrors(form?.errors, $t);
</script>

<FormLayout
  method="post"
  title={$t('common.auth.signIn')}
  wrapperClass="flex-1 flex flex-col justify-center"
>
  <TextInput
    value={form?.data?.email ?? ''}
    error={formErrors['email']}
    label={$t('common.auth.email')}
    inputId="email"
    type="email"
    autocomplete="email"
    required
  />

  <TextInput
    value={form?.data?.password ?? ''}
    error={formErrors['password']}
    label={$t('common.auth.password')}
    inputId="password"
    type="password"
    autocomplete="current-password"
    required
  />

  <div class="flex flex-col" slot="actions">
    <button type="submit" class="btn btn-primary w-full">{$t('common.auth.signIn')}</button>
    <a class="mt-5 w-fit px-0" href="/forgot-password">{$t('common.auth.forgotPassword')}</a>
    <a class="mt-3 w-fit px-0" href="/signup">{$t('common.auth.createNew')}</a>
  </div>
</FormLayout>
