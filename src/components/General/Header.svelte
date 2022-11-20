<script>
  import { displayLoginBulletin } from "../../stores/loginStore";
  let displayLogin;
  const loginClick = () => {
    displayLoginBulletin.subscribe((data) => {
      displayLogin = data;
    });
    displayLoginBulletin.set(!displayLogin);
  };
</script>

<nav>
  <ul>
    <li>Welcome</li>
    <li>Timeline</li>
    <li>Profile</li>
    <li>Settings</li>
    <li on:click={loginClick} on:keydown={loginClick}>Login</li>
  </ul>
</nav>

<style>
  ul {
    display: inline-flex;
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--primary);
  }
  li {
    display: block;
    color: var(--dark-paperlike);
    text-align: center;
    padding: 1.25rem 1.5rem;
    text-decoration: none;
  }

  li:hover {
    background-color: var(--secondary);
    color: var(--paperlike);
  }
</style>
