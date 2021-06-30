import Config from "./Config";
import BetterSideView from "./moudle/BetterSideView";
import Bookmark from "./moudle/Bookmark";
import DBNextChapter from "./moudle/DBNextChapter";
import DisableViewerLog from "./moudle/DisableViewerLog";
import FreeEmoji from "./moudle/FreeEmoji";
import HideAddNovel from "./moudle/HideAddNovel";
import HideEvent from "./moudle/HideEvent";
import InfoUnfold from "./moudle/InfoUnfold";
import PreviousBookmark from "./moudle/PreviousBookmark";
import Setting from "./moudle/Setting";

Config.Init();

BetterSideView.Start();
Bookmark.Start();
DBNextChapter.Start();
DisableViewerLog.Start();
FreeEmoji.Start();
HideAddNovel.Start();
HideEvent.Start();
InfoUnfold.Start();
PreviousBookmark.Start();
Setting.Start();