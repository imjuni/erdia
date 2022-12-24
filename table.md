## user (User)

| Name       | Name of Entity | Type        | Nullable | Attribute Key | Comment                     |
| :--------- | :------------- | :---------- | :------: | :-----------: | :-------------------------- |
| id         | id             | number      |          |      PK       |                             |
| photoId    | photo          | number      | nullable |      FK       |                             |
| lastName   | lastName       | varchar(64) |          |               |                             |
| isActive   | isActive       | boolean     |          |               | line1<br />line2<br />line3 |
| first_name | firstName      | string      |          |               | user firstname              |

## photo (Photo)

| Name        | Name of Entity | Type   | Nullable | Attribute Key | Comment |
| :---------- | :------------- | :----- | :------: | :-----------: | :------ |
| id          | id             | number |          |      PK       |         |
| description | description    | string |          |               |         |
| size        | size           | string |          |               |         |
| title       | title          | string |          |               |         |

## license (License)

| Name        | Name of Entity | Type   | Nullable | Attribute Key | Comment |
| :---------- | :------------- | :----- | :------: | :-----------: | :------ |
| id          | id             | number |          |      PK       |         |
| userId      | user           | number |          |      FK       |         |
| description | description    | string |          |               |         |
| title       | title          | string |          |               |         |
| expire      | expire         | date   |          |               |         |

## organization (Organization)

| Name        | Name of Entity | Type   | Nullable | Attribute Key | Comment |
| :---------- | :------------- | :----- | :------: | :-----------: | :------ |
| id          | id             | number |          |      PK       |         |
| description | description    | string |          |               |         |
| title       | title          | string |          |               |         |
| expire      | expire         | date   |          |               |         |

## license_organization_organization (license_organization_organization)

| Name           | Name of Entity | Type   | Nullable | Attribute Key | Comment |
| :------------- | :------------- | :----- | :------: | :-----------: | :------ |
| licenseId      | licenseId      | number |          |      FK       |         |
| organizationId | organizationId | number |          |      FK       |         |
