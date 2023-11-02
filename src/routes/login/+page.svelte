<h1>Sign in</h1>
<form action="/login/password" method="post">
  <section>
    <label for="email">Username</label>
    <input
      class="input input-bordered"
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
    />
  </section>
  <section>
    <label for="current-password">Password</label>
    <input
      class="input input-bordered"
      id="current-password"
      name="password"
      type="password"
      autocomplete="current-password"
      required
    />
  </section>
  <button type="submit">Sign in</button>
</form>
