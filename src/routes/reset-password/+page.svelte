<script lang="ts">
  import { t } from '$lib/translations';
  import TextInput from '$lib/components/form/TextInput.svelte';
  import FormLayout from '$lib/components/form/FormLayout.svelte';
  import { getTranslatedFormErrors } from '$lib/ts/formUtils/formUtilsClient';

  export let form;
  $: formErrors = getTranslatedFormErrors(form?.errors, $t);
</script>

<FormLayout
  title={$t('common.auth.forgotPassword')}
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

  <div class="flex flex-col" slot="actions">
    <button type="submit" class="btn btn-primary w-full"
      >{$t('common.auth.getPasswordResetLink')}</button
    >
    <a class="mt-5 w-fit px-0" href="/login">{$t('common.auth.signIn')}</a>
  </div>
</FormLayout>
