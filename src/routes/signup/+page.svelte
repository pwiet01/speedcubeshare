<script lang="ts">
  import { t } from '$lib/translations';
  import FormLayout from '$lib/components/form/FormLayout.svelte';
  import TextInput from '$lib/components/form/TextInput.svelte';
  import { getTranslatedFormErrors, updateFormData } from '$lib/ts/formUtils/formUtilsClient';
  import {
    validateEmailFormat,
    validatePasswordFormat,
    validateUsernameFormat,
  } from '$lib/ts/formUtils/validateClient';
  import type { FormParseData } from '$lib/ts/formUtils/types';
  import { globalConfig } from '$lib/config/globalConfig';

  export let form;

  let email = '';
  let password = '';
  let username = '';
  let displayName = '';

  $: wrapAndUpdateFormData(form?.data);
  $: formErrors = getTranslatedFormErrors(form?.errors);

  $: emailValid = validateEmailFormat(email);
  $: passwordValid = validatePasswordFormat(password);
  $: usernameValid = validateUsernameFormat(username);

  function wrapAndUpdateFormData(formData: FormParseData | undefined) {
    ({ email, password, username, displayName } = updateFormData(
      { email, password, username, displayName },
      formData
    ));
  }
</script>

<FormLayout
  method="post"
  title={$t('common.auth.signUp')}
  wrapperClass="flex-1 flex flex-col justify-center"
>
  <TextInput
    bind:value={email}
    error={formErrors['email']}
    label={$t('common.auth.email')}
    inputId="email"
    type="email"
    autocomplete="email"
    required
  />

  <TextInput
    bind:value={password}
    error={formErrors['password']}
    label={$t('common.auth.password')}
    info={$t('common.auth.passwordHint', { s1: globalConfig.user.passwordMinLength.toString() })}
    inputId="password"
    type="password"
    autocomplete="current-password"
    required
  />

  <TextInput
    bind:value={username}
    error={formErrors['username']}
    label={$t('common.user.username')}
    info={$t('common.auth.usernameHint')}
    inputId="username"
    autocomplete="username"
    required
    wrapperClass="my-8"
    maxlength={globalConfig.user.usernameMaxLength}
  />

  <TextInput
    bind:value={displayName}
    error={formErrors['displayName']}
    label={$t('common.user.displayName')}
    info={$t('common.auth.displayNameHint')}
    inputId="displayName"
    autocomplete="name"
    required
    maxlength={globalConfig.user.displayNameMaxLength}
  />

  <div class="flex flex-col items-center" slot="actions">
    <button
      disabled={!emailValid || !passwordValid || !usernameValid || displayName.trim().length === 0}
      class="btn btn-primary w-full"
      type="submit"
    >
      {$t('common.auth.signUp')}
    </button>
    <a class="mt-5" href="/login">{$t('common.auth.loginWithExisting')}</a>
  </div>
</FormLayout>
