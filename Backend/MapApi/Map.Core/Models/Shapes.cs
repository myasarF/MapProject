using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Xml.Linq;

namespace Map.Core.Models
{
    public class Shapes
    {
        [Key]
        public int Id { get; set; }
       
        [Column(TypeName = "text")]
        public string shapesData { get; set; }
        //[Column(TypeName = "xml")]
        //public string shapesData { get; set; }

        //[NotMapped]
        //public XElement ShapesData
        //{
        //    get { return XElement.Parse(shapesData); }
        //    set { shapesData = value.ToString(); }
        //}
    }
}
