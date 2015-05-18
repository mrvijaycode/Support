$(document).ready(function () {
	//alert('welcome to new concept file');
	$.ajax({
		success : function () {
			document.title = "Site Content Approval";
			loadContent();
			//setAlternateColor();
		}
	});
});

function loadContent() {
	var root = location.protocol + '//' + location.host;
	var myJson = [];
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		//webURL : webUrl,//pass webUrl dynamically
		listName : "ContentDraft", // List Name
		//CAMLQueryOptions : "",
		CAMLViewFields : '<ViewFields><FieldRef Name="_UIVersionString" /><FieldRef Name="CheckoutUser" /><FieldRef Name="_CopySource" /><FieldRef Name="Editor" /><FieldRef Name="Modified" /><FieldRef Name="Author" /><FieldRef Name="Created" /><FieldRef Name="ID" /><FieldRef Name="Content_x0020_Type" /><FieldRef Name="Legend" /><FieldRef Name="MaterialsType" /><FieldRef Name="MaterialsCategory" /><FieldRef Name="OtherPrograms" /><FieldRef Name="Approved" /><FieldRef Name="SiteName" /><FieldRef Name="Region" /><FieldRef Name="Programs" /><FieldRef Name="Country" /><FieldRef Name="SiteArea" /><FieldRef Name="Other_x0020_SiteArea" /><FieldRef Name="Other_x0020_Materials_x0020_Type" /><FieldRef Name="Other_x0020_Materials_x0020_Category" /><FieldRef Name="Description0" /><FieldRef Name="Content_x0020_Owner" /><FieldRef Name="ContentType" /><FieldRef Name="URL" /><FieldRef Name="toDelete" /><FieldRef Name="ContentM" /><FieldRef Name="Title" /></ViewFields>',
		CAMLQuery : '<Query><Where><IsNotNull><FieldRef Name="Region" /></IsNotNull></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query>',
		//CAMLRowLimit : 1,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			if (xData.status == 200) {
				//debugger;
				myJson = $(xData.responseXML).SPFilterNode("z:row").SPXmlToJson({
						mapping : {
							ows_FileLeafRef : {
								mappedName : "Name",
								objectType : "Text"
							},
							ows_SiteName : {
								mappedName : "siteName",
								objectType : "Text"
							},
							ows_SiteArea : {
								mappedName : "siteArea",
								objectType : "Text"
							},
							ows_Region : {
								mappedName : "region",
								objectType : "Text"
							},
							ows_FileRef : {
								mappedName : "Url",
								objectType : "Text"
							},
							ows_ID : {
								mappedName : "itmID",
								objectType : "Text"
							},
							ows_Approved : {
								mappedName : "IsApproved",
								objectType : "Text"
							},
							ows_Country : {
								mappedName : "country",
								objectType : "Text"
							},
							ows_Title : {
								mappedName : "title",
								objectType : "Text"
							},
							ows_Programs : {
								mappedName : "programs",
								objectType : "Text"
							},
							ows_ContentType : {
								mappedName : "Ctype",
								objectType : "Text"
							}
						}, // name, mappedName, objectType
						includeAllAttrs : true
					});
				//alert(myJson);
			} else {
				alert(xData.status);
			}
		}
	});

	//debugger;
	//JSON Viewer
	//http://jsonviewer.stack.hu/
	var listItemInfo = '<table border="0" cellspacing="1" cellpadding="5" class="tblcnt">';
	listItemInfo += '<tr><td class="tblhdr">Title</td><td class="tblhdr">Name</td><td class="tblhdr">Region</td><td class="tblhdr">Country</td><td class="tblhdr">Site Name</td><td class="tblhdr">Site Area</td><td class="tblhdr">Programs</td><td class="tblhdr">Edit</td><td class="tblhdr">Delete</td><td class="tblhdr"></td></tr>';
	for (var i = 0; i < myJson.length; i++) {

		var stTitle = "";
		if (typeof(myJson[i].title) != 'undefined') {
			stTitle = myJson[i].title;
		}

		var country = "";
		if (typeof(myJson[i].country) != 'undefined') {
			country = myJson[i].country.split(';#')[1];
		}

		var region = "";
		if (typeof(myJson[i].region) != 'undefined') {
			region = myJson[i].region.split(';#')[1];
		}

		var SiteName = "";
		if (typeof(myJson[i].siteName) != 'undefined') {
			SiteName = myJson[i].siteName.split(';#')[1];
		}

		var SiteArea = "";
		if (typeof(myJson[i].siteArea) != 'undefined') {
			//SiteArea = myJson[i].siteArea.split(';#')[1];
			SiteArea = myJson[i].siteArea.replace(/;#/g, '<br>');
		}
		
		var Programs = "";
		if (typeof(myJson[i].programs) != 'undefined') {
			var progs = myJson[i].programs.split(';#');
			$.each(progs, function (i) {
				 if(i % 2 != 0) {
					Programs+=progs[i]+"<br>";
				}
			});
		}

		var url = unescape(root + "/" + myJson[i].Url.split(';#')[1]);
		listItemInfo += "<tr>";

		listItemInfo += "<td class='tbltr'>" + stTitle + "</td>";

		if (myJson[i].Ctype == "Document") {
			listItemInfo += "<td class='tbltr'><a href='" + url + "'>" + myJson[i].Name.split(';#')[1] + "</a></td>";
		} else {
			listItemInfo += "<td class='tbltr'><a href='" + myJson[i].URL.split(', ')[0] + "'>" + myJson[i].URL.split(', ')[1] + "</a></td>";
		}

		listItemInfo += "<td class='tbltr'>" + region + "</td>";
		listItemInfo += "<td class='tbltr'>" + country + "</td>";
		listItemInfo += "<td class='tbltr'>" + SiteName + "</td>";
		listItemInfo += "<td class='tbltr'>" + SiteArea + "</td>";
		listItemInfo += "<td class='tbltr'>" + Programs + "</td>";

		listItemInfo += "<td class='tbltr'><a href=\"http://teamspace.pg.com/sites/vibrantlivingenablers/ContentDraft/Forms/EditForm_pcr2.aspx?ID=" + myJson[i].itmID + "&Source=http://teamspace.pg.com/sites/vibrantlivingenablers/WPPages/SiteContentApp.aspx\"><img align='center' style=\"border:0;height:16px;width:16px\" src=\"http://teamspace.pg.com/sites/vibrantlivingenablers/WPPages/Images/btn_edit.png\"/></a></td>";

		/*
		listItemInfo += "<td class='tbltr'><a href='javascript:deleteContent('" + myJson[i].itmID + "');'><img align='center' style=\"border:0;height:20px;width:20px\" src=\"http://teamspace.pg.com/sites/vibrantlivingenablers/WPPages/Images/delete.png\"/></a></td>";*/

		listItemInfo += "<td class='tbltr'><a href='javascript:deleteContent(\"" + myJson[i].itmID + "\");'><img align='center' style=\"border:0;height:20px;width:20px\" src=\"http://teamspace.pg.com/sites/vibrantlivingenablers/WPPages/Images/delete.png\"/></a></td>";

		if (myJson[i].IsApproved == 0) {
			listItemInfo += "<td class='tbltr'><table class='tbltr'><tr><td><img border='0' src='http://teamspace.pg.com/sites/vibrantlivingenablers/WPPages/Images/Approveq.png'/></td><td><a href='javascript:CopyAction(\"" + url + "\",\"" + myJson[i].Name.split(';#')[1] + "\",\"" + myJson[i].itmID + "\");'>Approve</a></td></tr></table></td>";
		} else {
			listItemInfo += "<td class='tbltr'><table class='tbltr'><tr><td><img src='http://teamspace.pg.com/sites/vibrantlivingenablers/WPPages/Images/Approved.png'/></td><td>Approved</td></tr></table></a></td>";
		}
		listItemInfo += "</tr>";
	}
	listItemInfo += "</table>";
	$('#divContent').html(listItemInfo);
	//CopyAction();
}
//https://spservices.codeplex.com/discussions/79766

function CopyAction(url, name, itmid) {
	$().SPServices({
		operation : "CopyIntoItemsLocal",
		async : false,
		SourceUrl : url,
		DestinationUrls : ["http://teamspace.pg.com/sites/vibrantlivingenablers/ProgramsandMaterials/" + name + ""],
		completefunc : function (xData, Status) {
			if (xData.status == 200) {
				//alert("Status=" + Status + " XML=" + xData.responseXML.xml);
				deleteDraft(itmid);
			} else {
				alert("Error: " + Status + " XML=" + xData.responseXML.xml);
			}
		}
	});
}

function deleteDraft(itmid) {
	$().SPServices({
		operation : "UpdateListItems",
		async : false,
		batchCmd : "Update",
		listName : "ContentDraft",
		updates : "<Batch OnError='Continue' ><Method ID='1' Cmd='Update'><Field Name='ID'>" + itmid + "</Field><Field Name='Approved' >1</Field><Field Name='toDelete' >1</Field></Method></Batch>",
		completefunc : function (xData, Status) {
			if (xData.status == 200) {
				alert('File approved successfully');
				getLatestModifiedFromContent();
				getInfoFromDraft(itmid);
				updateSiteContent(cntVals[0].itmID);
			} else {
				alert(xData.responseXML.xml);
			}
		}
	});
	loadContent();
}

var cntVals = [];
function getLatestModifiedFromContent() {
	//debugger;
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		//webURL : webUrl,//pass webUrl dynamically
		listName : "Programs and Materials", // List Name
		//CAMLQueryOptions : "",
		//CAMLViewFields : "<ViewFields><FieldRef Name='Title' /></ViewFields>",
		CAMLQuery : '<Query><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy><Where><Eq><FieldRef Name="FSObjType" /><Value Type="Lookup">0</Value></Eq></Where></Query>',
		CAMLRowLimit : 1,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			if (xData.status == 200) {
				//debugger;
				cntVals = $(xData.responseXML).SPFilterNode("z:row").SPXmlToJson({
						mapping : {
							ows_ID : {
								mappedName : "itmID",
								objectType : "Text"
							}
						}, // name, mappedName, objectType
						includeAllAttrs : true
					});
				//alert(cntVals);
			} else {
				alert(xData.status);
			}
		}
	});
}

var drftVals = [];
function getInfoFromDraft(itmid) {
	//debugger;
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		//webURL : webUrl,//pass webUrl dynamically
		listName : "ContentDraft", // List Name
		//CAMLQueryOptions : "",
		CAMLViewFields : '<ViewFields><FieldRef Name="_UIVersionString" /><FieldRef Name="CheckoutUser" /><FieldRef Name="_CopySource" /><FieldRef Name="Editor" /><FieldRef Name="Modified" /><FieldRef Name="Author" /><FieldRef Name="Created" /><FieldRef Name="ID" /><FieldRef Name="Content_x0020_Type" /><FieldRef Name="Legend" /><FieldRef Name="MaterialsType" /><FieldRef Name="MaterialsCategory" /><FieldRef Name="OtherPrograms" /><FieldRef Name="Approved" /><FieldRef Name="SiteName" /><FieldRef Name="Region" /><FieldRef Name="Programs" /><FieldRef Name="Country" /><FieldRef Name="SiteArea" /><FieldRef Name="Other_x0020_SiteArea" /><FieldRef Name="Other_x0020_Materials_x0020_Type" /><FieldRef Name="Other_x0020_Materials_x0020_Category" /><FieldRef Name="Description0" /><FieldRef Name="Content_x0020_Owner" /><FieldRef Name="ContentType" /><FieldRef Name="URL" /><FieldRef Name="toDelete" /><FieldRef Name="ContentM" /><FieldRef Name="Title" /></ViewFields>',
		CAMLQuery : '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">' + itmid + '</Value></Eq></Where></Query>',
		//CAMLRowLimit : 1,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			if (xData.status == 200) {
				//debugger;
				drftVals = $(xData.responseXML).SPFilterNode("z:row").SPXmlToJson({
						mapping : {
							ows_ID : {
								mappedName : "itmID",
								objectType : "Text"
							},
							ows_Content_x0020_Owner : {
								mappedName : "ContentOwner",
								objectType : "Text"
							},
							ows_Description0 : {
								mappedName : "description",
								objectType : "Text"
							},
							ows_Region : {
								mappedName : "region",
								objectType : "Text"
							},
							ows_Country : {
								mappedName : "country",
								objectType : "Text"
							},
							ows_SiteName : {
								mappedName : "siteName",
								objectType : "Text"
							},
							ows_SiteArea : {
								mappedName : "siteArea",
								objectType : "Text"
							},
							ows_Other_x0020_SiteArea : {
								mappedName : "otherSiteArea",
								objectType : "Text"
							},
							ows_Programs : {
								mappedName : "programs",
								objectType : "Text"
							},
							ows_OtherPrograms : {
								mappedName : "otherPrograms",
								objectType : "Text"
							},
							ows_MaterialsCategory : {
								mappedName : "materialsCat",
								objectType : "Text"
							},
							ows_Other_x0020_Materials_x0020_Category : {
								mappedName : "otherMatcat",
								objectType : "Text"
							},
							ows_MaterialsType : {
								mappedName : "materialsType",
								objectType : "Text"
							},
							ows_Other_x0020_Materials_x0020_Type : {
								mappedName : "otherMatType",
								objectType : "Text"
							},
							ows_ows_ContentType : {
								mappedName : "contentType",
								objectType : "Text"
							},
							ows_Legend : {
								mappedName : "status",
								objectType : "Text"
							}
						}, // name, mappedName, objectType
						includeAllAttrs : true
					});
				//alert(drftVals);
			} else {
				alert(xData.status);
			}
		}
	});
}

function updateSiteContent(itmid) {
	
	
	$().SPServices({
		operation : "UpdateListItems",
		async : false,
		batchCmd : "Update",
		listName : "Programs and Materials",
		updates : "<Batch OnError='Continue' PreCalc='TRUE' >"
		 + "<Method ID='1' Cmd='Update'>"
		 + "<Field Name='ID'>" + itmid + "</Field>"
		 + "<Field Name='OtherPrograms' >" + drftVals[0].otherPrograms + "</Field>"
		 + "<Field Name='SiteArea' >" + drftVals[0].siteArea + "</Field>"
		 + "<Field Name='MaterialsCategory' >" + drftVals[0].materialsCat + "</Field>"
		 + "<Field Name='ContentType' >" + drftVals[0].contentType + "</Field>"
		 + "<Field Name='Programs' >" + drftVals[0].programs + "</Field>"
		 + "<Field Name='MaterialsType' >" + drftVals[0].materialsType + "</Field>"
		 + "<Field Name='Region' >" + drftVals[0].region + "</Field>"
		 + "<Field Name='Country' >" + drftVals[0].country + "</Field>"
		 + "<Field Name='SiteName' >" + drftVals[0].siteName + "</Field>"
		 + "<Field Name='Description0' >" + drftVals[0].description + "</Field>"
		 + "<Field Name='Legend' >" + drftVals[0].status + "</Field>"
		 + "</Method></Batch>",
		completefunc : function (xData, Status) {
			if (xData.status == 200) {
				//alert('File updated successfully');
			} else {
				alert(xData.responseXML.xml);
			}
		}
	});
}

function setAlternateColor() {
	$("#divContent table tr:even").css("background-color", "#F3E5AB");
	$("#divContent table tr:odd").css("background-color", "#fff1e5");
}

function deleteContent(id) {
	var x;
	if (confirm("Your document will be deleted permanently.") == true) {
		$().SPServices.SPUpdateMultipleListItems({
			listName : "ContentDraft",
			CAMLQuery : "<Query><Where><Eq><FieldRef Name='ID'/><Value Type='Text'>" + id + "</Value></Eq></Where></Query>",
			batchCmd : "Delete",
			completefunc : function (xData, Status) {
				if (xData.status == 200) {
					alert('Deleted Successfully');
				}
			}
		});
		loadContent();
	} else {}
}