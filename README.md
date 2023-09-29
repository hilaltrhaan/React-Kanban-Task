# RmDatagrid
[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&ts=1683906897&type=6e&v=0.0.43&x2=0)](https://www.npmjs.com/package/rm-datagrid)
## Installation
1.Install dependency:

```bash
  npm i rm-datagrid 
```
2.Include RmDatagridModule to your module:

```javascript
// First, import the required module
import { RmDatagridModule } from 'rm-datagrid';

@NgModule({
  declarations: [ ... ],
  imports: [
    RmDatagridModule, // Include the RM-Datagrid module in the project
    ...
  ],
  ...
})
export class YourModule { }
```


## Examples 

app.component.html
```html
<rm-data-grid *ngIf="dataBuilder” [options]="dataBuilder"></rm-data-grid>
```
app.component.ts
```javascript
import { Component} from '@angular/core';
import { RmField, RmGridBuilder} from 'rm-datagrid';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent{
  dataBuilder: RmGridBuilder;
  //Columns
   let fields: RmField[] = [
      {
        allowEditing: true,
        caption: 'Column1',
        isPrimary: false,
        visible: true,
        name: 'columnField',
        fixed: false,
        validationRules: [{ type: 'required' }],
        dataType: 'string',
      },
      {
        allowEditing: true,
        caption: 'Column2',
        isPrimary: false,
        visible: true,
        name: 'columnField2',
        fixed: false,
        validationRules: [{ type: 'required' }],
        dataType: 'string',
      },
      {
        allowEditing: true,
        caption: 'Column3',
        isPrimary: false,
        visible: true,
        name: 'columnField3',
        fixed: false,
        validationRules: [{ type: 'required' }],
        dataType: 'string',
      },
    ];


   
//Rm-Datagrid properties
 this.dataBuilder = {
      id: 'id',
      dataSource: {
        key: 'id',
        path: '',
        options: {},
      },
      fields: fields,
      properties: {
        searchPanel: {
          visible: true,
          width: 140,
          placeholder: 'Ara',
        },
        editing: {
          mode: 'popup',
          useIcons: true,
          allowAdding: true,
          allowUpdating: true,
          allowDeleting: true,
          popup: {
            title: 'Rast Mobile',
            showTitle: true,
            maxHeight: 500,
            maxWidth: 750,
          },
          form: {
            labelLocation: 'top',
          },
        },
        filterRow: {
          visible: true,
        },
        toolbarText: {
          insertRowText: 'Yeni Bir Satır Ekle',
        },
      },
    };
}
```
## More
For more examples, please visit **[Demo](link)**.
