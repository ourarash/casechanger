import { Component } from '@angular/core';
import {ToastController, NavController , Platform} from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { Keyboard } from '@ionic-native/keyboard';
import { SocialSharing } from '@ionic-native/social-sharing';

declare var cordova : any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todo: any = {}
  transformedStr;
  showSpinner

  constructor(
    private toastController: ToastController,
    public navCtrl: NavController,
    private platform: Platform,
    private keyboard: Keyboard,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing
  ) {
    this.todo.text = `“Interesting capitalization,' I said.

'Yeah. I'm a big believer in random capitalization. The rules of capitalization are so unfair to words in the middle.” 

― John Green, Paper Towns`;
    this.showSpinner = false;
  }

  process(op) {
    console.log('this.todo: ' + JSON.stringify(this.todo));
    if (this.isEmpty(this.todo.text)) {
      return
    }
    this.transformedStr = '';
    switch (op) {
      //random
      case 0: {
        this.transformedStr = this.randomize(this.todo.text);
        break;
      
      }//case
      //All caps  
      case 1: {
        for (var l of this.todo.text) {
          var l2;
          l2 = l.toUpperCase();
          this.transformedStr += l2;
        }
        break;
        
      }
      // all lows  
       case 2: {
        for (var l of this.todo.text) {
          var l2;
          l2 = l.toLowerCase();
          this.transformedStr += l2;
        }
        break;
        
      }  
      //Title case  
      case 3: {
        this.transformedStr = this.titleCase(this.todo.text);
        break;
      }
      //Sentence case
      case 4: {
        this.transformedStr = this.sentenceCase(this.todo.text);
        break;
      }
      //Clear
      case 5: {
        this.transformedStr = '';
        break;
      }
      
      case 6: {
        this.transformedStr = this.doubleSpace(this.todo.text);
        break;
      }  

      case 7: {
        this.transformedStr = this.halfSpace(this.todo.text);
        break;
      }  
    }//switch
    
    
    
    console.log('transformedStr: ' + JSON.stringify(this.transformedStr));
    
    this.todo.text = this.transformedStr;

  }

  randomize(str) {
    var result = '';
    for (var l of str) {
      var rand = Math.floor((Math.random() * 10) + 1);
      var l2;
      if (rand > 5)
        l2 = l.toUpperCase();
      else
        l2 = l.toLowerCase();
      result += l2;
          
    }
    return result;
  }
  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  sentenceCase(str) {
    str = str.toLowerCase();
    var rg = /(^\w{1}|[\.\?\!]\s*\w{1})/gi;
    
    str = str.replace(rg, function (toReplace) {
      return toReplace.toUpperCase();
    });
    console.log('str: ' + JSON.stringify(str));
    return str;
  }

  clipBoardCopy() {
    this.clipboard.copy(this.todo.text);
    let toast = this.toastController.create({
      message: 'Copied to clipboard',
      duration: 1500,
      position: 'buttom'
    });
    toast.present();

  }

  clipBoardPaste() {

    this.clipboard.paste().then(
      (resolve: string) => {
        alert('resolve:' + resolve);
        this.todo.text = resolve;
      },
      (reject: string) => {
        alert('Error: ' + reject);
      }
    );

  }

  toggleKeyboard() {
    if (this.platform.is('cordova')) {
      if (cordova.plugins.Keyboard.isVisible) {
        this.keyboard.close();
                
      } else {
        this.keyboard.show();
                
      }
    }
  }
  isEmpty(str) {
    if (str == '') {
      let toast = this.toastController.create({
        message: 'Text is empty!',
        duration: 1500,
        position: 'buttom'
      });
      toast.present();
      console.log("Text is empty");
      return true
    } else
      return false;
  }
  share() {
    if (this.isEmpty(this.todo.text)) {
      return
    } else {
      try {
        this.showSpinner = true;
        this.socialSharing.shareWithOptions({
          message: this.todo.text + "\n\nCreated by Case Changer App"
        })
          .then(() => {
            this.showSpinner = false;
        })  
        .catch((e) => {
          alert("Error:" + e);
        });
       
      }
      catch (e) {
        alert("Try Error:" + e);
      }
    
    }

  }

  doubleSpace(str) {
    //  str = str.toLowerCase().split(' ');
    console.log('str: ' + JSON.stringify(str) );
    var str2 = "";
    for (var i = 0; i < str.length; i++) {
      str2 = str2 + ' ' + str[i];
    }
    return str2;
  }

  halfSpace(str) {
    //  str = str.toLowerCase().split(' ');
    console.log('str: ' + JSON.stringify(str) );
    var str2 = "";
    for (var i = 0; i < str.length - 1; i++) {
      if (str[i+1]==' '){
        str2 = str2 + str[i];
        i++;
      } else {
        str2 = str2 + str[i];
      }
      
    }
    return str2;
  }
}  
