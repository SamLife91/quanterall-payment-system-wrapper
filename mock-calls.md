# API body data (test)
## /api/v1/login
```
{
  type: "login",
  operation: "auth",
  data: {
    user: "elvis",
    password: "elvis"
  }
}
```

## /api/v1/register

```
{
    type: 'register',
    operation: 'auth',
    data: {
      user: 'arslan',
      password: 'arslan_password',
      mail: 'arslan@mail.arslan',
      first_name: 'arslan',
      last_name: 'arslan'
    }
  }
```

## /api/v1/device/add

```
{
  type: 'add_device',
  operation: 'system',
  auth: {
    user: 'arslan',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTE0MDI3NDZ9.AuKKWZ0z8qA8qSUIccw1lDHS-glR8_T7Rnhnpotys1vOFqkMXxeOlDDv4oVhHCnUT_PbGZ-sIxvNdEhMteN7BZUYaZ8tpW60VC_isUeokzp2E5pReByM2ytstAaKPcxkcHT8q1ZkQFaokWtaKs1QFgRtpsB4ykdNO3hqML9wEjAN9ZWGrgHNeADAv3t-CKWQ7FfXy6ryMRwOO5KbJ7DTJWrGeG42GYhYcMe86gU5XfeSqaf4NDdRyGujao4jWclY7KskvfEOhjR0HOiiR4iBVIemIqwamZyvuIij7qofxG7usCyy1w3MFCKsxdR7w0EwikZ0TDAuUWP2GhEeLMq6Mg'
  },
  data: {
    type: 'fiscal',
    manufacture: 'datecs',
    model: 'fp-60kl',
    serial_number: 'dt2742k873'
  }
}
```

## /api/v1/device

```
{
  type: 'get_all_devices',
  operation: 'system',
  auth: {
    user: 'elvis',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTE0ODY3MDN9.FMzqx-RnaJ9DnY44y44H8GOJXHgkXc5pAJCbdVjAtQO-AuFToLfDJd76IUroPQiSsAy_AxyxrQm-yNXq1i1v-nqPYJd-vqEYfKzDbIxm7l3K9e67wh6lgt161jh9OW9Uwi5mGzbuWYWh_budJK5xNnp4pz4y3T7G07nE2sxjouNTvwwEBWyigE6rLqQBURJD3PPxiqLf-nF0Cv8N6MhqMjt5qYuRoMGZZuAwY0G2T2_UkgD9YQF1T73aRYcDsq93XHFySnH6SgcR_UpyfPKpZMW-o2G7-kz11_s_6wc-cXUmv1e9KEwOZLo4WR1gU_81iEY6u_BXW9WyBfJzPGJohw'
  }
}
```

## /api/v1/item/add
```
{
  type: 'add_item',
  operation: 'build_command',
  auth: {
    user: 'elvis',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTE0ODY3MDN9.FMzqx-RnaJ9DnY44y44H8GOJXHgkXc5pAJCbdVjAtQO-AuFToLfDJd76IUroPQiSsAy_AxyxrQm-yNXq1i1v-nqPYJd-vqEYfKzDbIxm7l3K9e67wh6lgt161jh9OW9Uwi5mGzbuWYWh_budJK5xNnp4pz4y3T7G07nE2sxjouNTvwwEBWyigE6rLqQBURJD3PPxiqLf-nF0Cv8N6MhqMjt5qYuRoMGZZuAwY0G2T2_UkgD9YQF1T73aRYcDsq93XHFySnH6SgcR_UpyfPKpZMW-o2G7-kz11_s_6wc-cXUmv1e9KEwOZLo4WR1gU_81iEY6u_BXW9WyBfJzPGJohw'
  },
  data: {
    item_data: {
      group: '1',
      name: 'test_item_name',
      number: '1',
      quantity: '1',
      price: '1.00',
      tax_group: 'Б'
    },
    device: {
      id: '11136'
    }
  }
}
```

## /api/v1/item/get

```
{
  type: 'get_item',
  operation: 'build_command',
  auth: {
    user: 'elvis',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTE0MDI3NDZ9.AuKKWZ0z8qA8qSUIccw1lDHS-glR8_T7Rnhnpotys1vOFqkMXxeOlDDv4oVhHCnUT_PbGZ-sIxvNdEhMteN7BZUYaZ8tpW60VC_isUeokzp2E5pReByM2ytstAaKPcxkcHT8q1ZkQFaokWtaKs1QFgRtpsB4ykdNO3hqML9wEjAN9ZWGrgHNeADAv3t-CKWQ7FfXy6ryMRwOO5KbJ7DTJWrGeG42GYhYcMe86gU5XfeSqaf4NDdRyGujao4jWclY7KskvfEOhjR0HOiiR4iBVIemIqwamZyvuIij7qofxG7usCyy1w3MFCKsxdR7w0EwikZ0TDAuUWP2GhEeLMq6Mg'
  },
  data: {
    item_data: {
      number: '1',
    },
    device: {
      id: '1'
    }
  }
}
```