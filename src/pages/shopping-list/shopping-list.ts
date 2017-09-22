import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

// /**
//  * Generated class for the ShoppingListPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */
//
// @IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase,
              private actionSheetCtrl: ActionSheetController) {
    //not only to push to database but we have access to everything on the node
    this.shoppingListRef$ = this.database.list('shopping-list');

    //subscribe to observable!! its not listening yet!
    //but there is a better way! in the view (html) using *ngFor
    //this.shoppingListRef$.subscribe(x => console.log(x));

  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    //display an action sheet that gives edit, delete, cancel selection
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            //send user to edit shopping item page and pass key as parameter
            this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.$key });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            //delete the selection, key passed via parameter
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Teh user has selected the cancel button");
          }
        }
      ]
    }).present();
  }

  navigateToAddShoppingPage() {
  //can access nav controller as it was injected automatically in the constructor
  //navigate user to add shopping page

  this.navCtrl.push(AddShoppingPage)

  //setRoot does not give back button on the nav
  //this.navCtrl.setRoot(AddShoppingPage)
  }

}
